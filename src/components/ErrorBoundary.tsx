import { Component, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorKey: number; // Key to force remounting
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorKey: 0 };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught by ErrorBoundary:", error);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
    if (this.state.hasError && prevState.hasError) {
      // Reset error boundary when the user navigates
      this.setState({ hasError: false, errorKey: prevState.errorKey + 1 });
    }
  }

  render() {
    if (this.state.hasError) {
      return <Navigate to="/404" replace />;
    }

    return <div key={this.state.errorKey}>{this.props.children}</div>; // Forces re-render
  }
}

export default ErrorBoundary;
