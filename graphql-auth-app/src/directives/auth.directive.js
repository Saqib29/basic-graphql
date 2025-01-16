import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils"
import { defaultFieldResolver } from "graphql"


export const authDirective = (directiveName) => {
  return {
    authDirectiveTransformer: (schema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          const authDirective = getDirective(
            schema,
            fieldConfig,
            directiveName
          )?.[0];
          if (authDirective) {
            const { resolver = defaultFieldResolver } = fieldConfig;
            const { role } = authDirective;

            fieldConfig.resolve = async function (...args) {
              const context = args[2];
              const user = context.user;

              if (!user) throw new Error("Not authentication");

              if (role && user.role !== role) throw new Error("Not authorized");

              return resolver.apply(this, args)
            };
          }

          return fieldConfig
        },
      }),
  };
};