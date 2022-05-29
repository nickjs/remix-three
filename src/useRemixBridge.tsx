import type { Context } from "react";
import { useContextBridge } from "@react-three/drei";

import { RemixEntryContext, RemixRouteContext } from "@remix-run/react";
import {
  UNSAFE_RouteContext,
  UNSAFE_LocationContext,
  UNSAFE_NavigationContext,
} from "react-router";

export function useRemixBridge(...contexts: Array<Context<any>>) {
  const ContextBridge = useContextBridge(
    UNSAFE_LocationContext,
    UNSAFE_NavigationContext,
    UNSAFE_RouteContext,
    RemixEntryContext,
    RemixRouteContext,
    ...contexts
  );

  return ContextBridge;
}
