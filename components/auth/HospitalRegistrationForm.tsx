"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function HospitalRegistrationForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contact: "",
    establishYear: "",
    registrationNo: "",
    type: "PRIVATE",
    address: "",
    city: "",
    pincode: "",
    centers: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        role: "hospital",
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        address: formData.address,
        establishYear: Number(
          formData.establishYear
        ),
        registrationNo:
          formData.registrationNo,
        type: formData.type,
        city: formData.city,
        pincode: formData.pincode,

        centers: formData.centers
          ? formData.centers
              .split(",")
              .map((center) => ({
                name: center.trim(),
              }))
              .filter(
                (center) => center.name
              )
          : [],
      };

      const response =
        await axios.post(
          "https://api.swasthyapro.com/api/auth/register-doctor-hospital",
          payload,
          {
            headers: {
              "Content-Type":
                "application/json",
            },
          }
        );

      alert(
        response.data?.message ||
          "Hospital Registered Successfully"
      );

      router.push("/login");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data
          ?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Hospital Name"
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="tel"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        placeholder="Contact Number"
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="text"
        value="Other"
        disabled
        className="w-full rounded-lg border bg-muted p-3"
      />

      <input
        type="number"
        name="establishYear"
        value={formData.establishYear}
        onChange={handleChange}
        placeholder="Establishment Year"
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="text"
        name="registrationNo"
        value={formData.registrationNo}
        onChange={handleChange}
        placeholder="Registration Number"
        className="w-full rounded-lg border p-3"
        required
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      >
        <option value="PRIVATE">
          Private
        </option>
        <option value="GOVT">
          Government
        </option>
        <option value="TRUST">
          Trust
        </option>
        <option value="CLINIC">
          Clinic
        </option>
      </select>

      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        rows={3}
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="text"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        placeholder="Pincode"
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="text"
        name="centers"
        value={formData.centers}
        onChange={handleChange}
        placeholder="Centers (comma separated)"
        className="w-full rounded-lg border p-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary py-3 font-medium text-white disabled:opacity-50"
      >
        {loading
          ? "Registering..."
          : "Register Hospital"}
      </button>
    </form>
  );
}