// env.d.ts file is a TypeScript declaration file used to type and declare environment variables in your project
namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
      NEXT_PUBLIC_MAP_ID: string;
    }
}