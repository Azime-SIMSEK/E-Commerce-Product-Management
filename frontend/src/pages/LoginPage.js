import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Hata mesajı için state ekledim
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Her giriş denemesinde hatayı sıfırlar

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      // API başarılı döndüğünde access token ve kullanıcı bilgilerini kaydeder
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Kullanıcıyı kaydeder

      navigate("/products"); // Kullanıcıyı ürünler sayfasına yönlendirir
    } catch (error) {
      if (error.response) {
        // Sunucu yanıt döndürdüyse (örneğin yanlış şifre vs.)
        setError(error.response.data.message || "Login Failed!");
      } else {
        // Sunucuyla bağlantı hatası varsa
        setError("The server could not be reached. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container" >
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} 
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Note: Test User Information: <b>test@example.com</b> | Password: <b>123456</b></p>

    </div>
 
  );
}

export default LoginPage;
