import { useNavigate } from "react-router-dom";

import { FullPageError } from "../components/StateScreens";

function NotFound() {
  const navigate = useNavigate();

  return (
    <FullPageError
      title="Page not found"
      message="The page you are looking for does not exist or has moved."
      onRetry={() => navigate("/dashboard")}
    />
  );
}

export default NotFound;
