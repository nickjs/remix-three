import { Children, cloneElement } from "react";
import type { ReactElement } from "react";
import { useHref, useNavigate } from "@remix-run/react";
import type { LinkProps as RemixLinkProps } from "@remix-run/react";
import type { ThreeEvent } from "@react-three/fiber";

interface Link3dProps extends RemixLinkProps {}

export function Link3d(props: Link3dProps) {
  const { onClick, children, to } = props;

  const navigate = useNavigate();
  const href = useHref(to);

  if (!Children.only(children)) {
    throw new Error("Link takes a single child that is a Three Element");
  }

  const child = children as ReactElement;
  const {
    onPointerOver,
    onPointerOut,
    onClick: childOnClick,
  } = child.props || {};

  return cloneElement(child, {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      document.body.style.cursor = "pointer";
      onPointerOver?.(e);
    },
    onPointerOut: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      document.body.style.cursor = "default";
      onPointerOut?.(e);
    },
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();

      onClick?.(e.nativeEvent as any);
      childOnClick?.(e);

      if (!e.stopped && !e.nativeEvent.defaultPrevented) {
        if (props.reloadDocument) {
          window.location.assign(href);
        } else {
          navigate(href, { replace: props.replace, state: props.state });
        }
      }
    },
  });
}
