import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: ["src/**/*.ts", "src/**/*.tsx"], // .ts 파일도 포함
  generates: {
    "./src/shared/api/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
      config: {
        skipTypename: true,
        scalars: {
          Timestamp: "string",
        },
      },
    },
  },
};

export default config;
