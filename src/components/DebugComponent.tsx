// file: components/shared/DebugComponent.tsx
export default function DebugComponent({ name }: { name: string }) {
  console.log(`${name}:`, typeof window !== "undefined" ? "Client" : "Server");
  return null;
}
