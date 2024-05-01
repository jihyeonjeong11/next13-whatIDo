"use client";
import SignUpForm from "../components/form-page";

export default function FormPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignUpForm />
    </main>
  );
}

// https://medium.com/@prithvi128717/creating-a-form-in-react-with-react-hook-form-and-next-js-13-4-5dae780daaef
// https://articles.wesionary.team/react-hook-form-schema-validation-using-zod-80d406e22cd8
