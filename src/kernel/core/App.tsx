import "../../assets/styles/App.css";
import { UserProvider } from "../context/user.tsx";

export default function App(props: any) {
  return (
    <UserProvider>
      <div className="min-h-screen ">
        <div className="w-full h-full">
          <div className="w-full h-full">
            <slot>{props.children}</slot>
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
