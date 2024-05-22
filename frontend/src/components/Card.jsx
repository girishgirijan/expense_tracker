import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { formatDate } from "../utils/formatDate";

import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
  // Add more categories and corresponding color classes as needed
};

export default function Card({ transaction }) {
  let { description, paymentType, category, amount, location, date } =
    transaction;
  const [deleteTransaction, { loading, error }] = useMutation(
    DELETE_TRANSACTION,
    { refetchQueries: ["GetTransactions"] }
  );

  const cardClass = categoryColorMap[category];
  //Delete transaction
  const handleDelete = async () => {
    try {
      await deleteTransaction({
        variables: { transactionId: transaction._id },
      });
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message);
    }
  };
  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white capitalize">
            {category}
          </h2>
          <div className="flex items-center gap-2">
            {!loading && (
              <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            )}
            {loading && (
              <div className="w-6 h-6 border-t-2 border-b-2 rounded-full animate-spin"></div>
            )}
            <Link to={`/transaction/${transaction._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description: <span className="capitalize">{description}</span>
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type: <span className="capitalize">{paymentType}</span>
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: ${amount}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: <span className="capitalize">{location}</span>
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">{formatDate(date)}</p>
          <img
            src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
            className="h-8 w-8 border rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
