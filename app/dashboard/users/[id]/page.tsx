"use client";
import { useParams } from "next/navigation";

export default function UserPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div>
      <h1>User ID: {id}</h1>
      {/* Fetch and display user details using the id */}
    </div>
  );
}
