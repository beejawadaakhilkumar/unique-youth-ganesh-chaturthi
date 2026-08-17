export default function Login() {
  return (
    <main className="admin-wrap login-wrap">
      <div className="panel login-panel">
        <h1>Admin Login</h1>
        <p className="login-notice-text">
          Authentication is prepared for Supabase Auth. Configure your Supabase project and protect the admin routes before production use.
        </p>
        <form>
          <label className="label">Email</label>
          <input className="input" type="email" placeholder="admin@example.com" />
          <br />
          <br />
          
          <label className="label">Password</label>
          <input className="input" type="password" placeholder="••••••••" />
          <br />
          <br />
          
          <button className="btn btn-primary" type="button">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}