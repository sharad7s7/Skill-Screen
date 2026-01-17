import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Skill Screen 🚀</h1>
      <p>Deployment successful ❤️❤️❤️❤️❤️</p>

      <SignedOut>
        <SignInButton mode="modal">
          <button style={btn}>Sign In</button>
        </SignInButton>

        <SignUpButton mode="modal">
          <button style={btn}>Sign Up</button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <p>✅ You are signed in</p>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}

const btn = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

export default App;
