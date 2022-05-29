## remix-three

Hi! remix-three is a very tiny shim layer allowing you to render a `<Canvas>` from [`@react-three/fiber`](https://docs.pmnd.rs/react-three-fiber/) into a [Remix](https://remix.run) app, as well as render Remix `<Outlet>`s and calls to `useLoaderData()` _inside_ your `<Canvas>`.

This repo consists of three things:

1. A set of `patch-package` patches to make all the `@react-three/*` libraries play nice with the Remix compiler.
2. A `useRemixBridge` utility build on `@react-three/drei`'s `useContextBridge` that will replay all of the necessary Remix context values into the `<Canvas>` rendering fiber.
3. A `<Link3d>` component that allows you to have any object in your 3D scene participate in Remix navigation.

## Getting started

1. `npm i remix-three @react-three/fiber@8.0.19 @react-three/drei@9.11.3 @remix-run/react@1.5.1 patch-package`

2. Add the following to your `package.json`:

```json
{
  "scripts": {
    "postinstall": "patch-package --patch-dir node_modules/remix-three/patches"
  }
}
```

3. Use `useRemixBridge()` when you create your `<Canvas>`:

```tsx
// app/routes/canvas.tsx
import { useRemixBridge } from "remix-three";

export default function CanvasRoute() {
  let RemixBridge = useRemixBridge();

  return (
    <Canvas>
      <RemixBridge>
        <MyScene />
      </RemixBridge>
    </Canvas>
  );
}

function MyScene() {
  let matches = useMatches();
  let data = useLoaderData();
  let location = useLocation();

  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  );
}
```

> NB: You **must** split out your scene content into a separate component that you render _inside_ the RemixBridge in order to access anything from the remix or react-router context.

## Link3d

In general, this component takes the exact same props as a regular Remix `<Link>` but wraps an `Object3D` inside your scene. It works by invoking navigation directly in the same way a regular `<Link>` would. It is totally possible this component may mess with your refs or click handlers of the child element, but I've done my best to avoid that.

```tsx
import { Link3d } from 'remix-three'

function MyScene() {
	return (
		<Link to="./author">
			<mesh>
				<boxGeometry args={[1, 1, 1]} />
				<meshNormalMaterial />
			</mesh>
		</Link>

		<Outlet />
	)
}
```
