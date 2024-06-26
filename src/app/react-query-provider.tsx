"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useHydrateAtoms } from "jotai/react/utils";
import { queryClientAtom } from "jotai-tanstack-query";
import React, { useState } from "react";
import { Provider } from "jotai";

const HydrateAtoms = ({
  children,
  client,
}: {
  children: React.JSX.Element;
  client: QueryClient;
}) => {
  useHydrateAtoms([[queryClientAtom, client]]);

  return children;
};

const QueryProviders = ({ children }: { children: React.JSX.Element }) => {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } }),
  );

  return (
    <>
      <QueryClientProvider client={client}>
        <Provider>
          <HydrateAtoms client={client}>{children}</HydrateAtoms>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default QueryProviders;
