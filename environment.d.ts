declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STRIPE_PUBLIC_KEY: string;
      NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
      API_URL: string;
      NEXT_PUBLIC_API_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
