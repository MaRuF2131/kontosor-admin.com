"use client";
import Swal from "sweetalert2";

export const confirmDelete = async (deleteCallback) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await deleteCallback();

      await Swal.fire({
        title: "Deleted!",
        text: "Your item has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      return true; // permission granted
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
      return false;
    }
  }

  return false; // user cancelled
};