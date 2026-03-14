import { signIn, signOut } from "next-auth/react";

// Login function
export const credentialsLogin = async (formData) => {
  try {
    const loginRes = await signIn("credentials", {
      redirect: false,
      email:formData.email,
      name: formData.name,
      password: formData.password,
    });

    if (!loginRes) {
      throw new Error("Login response not found");
    }

    if (loginRes.error) {
      return {
        success: false,
        error: loginRes.error,
      };
    }

    return {
      success: true,
      data: loginRes,
    };
  } catch (error) {
    console.error("Login Error:", error);

    return {
      success: false,
      error: error.message || "Something went wrong",
    };
  }
};


// Logout function
export const logoutUser = async () => {
  try {
    await signOut({
      redirect: false,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Logout Error:", error);

    return {
      success: false,
      error: error.message || "Logout failed",
    };
  }
};