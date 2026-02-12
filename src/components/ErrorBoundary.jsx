import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 bg-red-100 flex items-center justify-center p-8 z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-2xl">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h1>
                        <p className="font-mono text-sm bg-gray-100 p-4 rounded overflow-auto mb-4">
                            {this.state.error && this.state.error.toString()}
                        </p>
                        <details className="whitespace-pre-wrap text-xs text-gray-500">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </details>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
