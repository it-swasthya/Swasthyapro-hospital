"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DoctorRegistrationForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contact: "",
    gender: "",
    age: "",
    speciality: "",
    registrationNo: "",
    experience: "",
    hospitals: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
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
        role: "doctor",
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        gender: formData.gender,
        age: Number(formData.age),
        address: formData.address,
        speciality: formData.speciality,
        registrationNo:
          formData.registrationNo,
        experience: Number(
          formData.experience
        ),
        hospitals: formData.hospitals
          ? formData.hospitals
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
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
          "Registration Successful"
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
        placeholder="Full Name"
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
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full rounded-lg border p-3"
      />

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
        required
      >
        <option value="">
          Select Gender
        </option>
        <option value="Male">
          Male
        </option>
        <option value="Female">
          Female
        </option>
        <option value="Other">
          Other
        </option>
      </select>

      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="text"
        name="speciality"
        value={formData.speciality}
        onChange={handleChange}
        placeholder="Speciality"
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="text"
        name="registrationNo"
        value={formData.registrationNo}
        onChange={handleChange}
        placeholder="Medical Registration Number"
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="number"
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        placeholder="Experience (Years)"
        className="w-full rounded-lg border p-3"
        required
      />

      <input
        type="text"
        name="hospitals"
        value={formData.hospitals}
        onChange={handleChange}
        placeholder="Associated Hospital(s) (comma separated)"
        className="w-full rounded-lg border p-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary py-3 font-medium text-white disabled:opacity-50"
      >
        {loading
          ? "Registering..."
          : "Register as Doctor"}
      </button>
    </form>
  );
}