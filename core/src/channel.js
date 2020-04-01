import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useReducer } from "react";

const reducer = (state, { type, payload }) => {
	switch (type) {
		case "connection_error":
			return {
				isConnected: false,
				isConnecting: false,
				error: payload
			};

		case "connected":
			return {
				isConnected: true,
				isConnecting: false,
				error: null,
				connection: payload
			};

		case "reconnecting":
			return {
				isConnected: false,
				isConnecting: true,
				error: payload
			};

		case "disconnected":
			return {
				isConnected: false,
				isConnecting: false,
				error: payload
			};

		default:
			return state;
	}
};

const useChannel = (url, accessToken) => {
	const [state, dispatch] = useReducer(reducer, {
		connection: null,
		isConnecting: true,
		isConnected: false,
		error: null
	});

	useEffect(() => {
		let connection, disposed;

		async function connect() {
			connection = new HubConnectionBuilder()
				.withUrl(url, {
					accessTokenFactory: () => accessToken
				})
				.configureLogging(LogLevel.Information)
				.withAutomaticReconnect()
				.build();

			if (disposed) return;
			connection.onreconnecting(error => {
				if (!disposed) {
					dispatch({ type: "reconnecting", payload: error });
				}
			});

			if (disposed) return;
			connection.onreconnected(() => {
				if (!disposed) {
					dispatch({ type: "connected", payload: connection });
				}
			});

			if (disposed) return;
			connection.onclose(error => {
				if (!disposed) {
					dispatch({ type: "disconnected", payload: error });
				}
			});

			if (disposed) return;
			try {
				await connection.start();
			} catch (err) {
				if (!disposed) {
					dispatch({ type: "connection_error", payload: err });
				}
			}

			if (disposed) return;
			dispatch({ type: "connected", payload: connection });
		}

		if (accessToken) {
			connect();
		}

		return () => {
			disposed = true;

			if (connection) {
				connection.stop();
			}
		};
	}, [accessToken, url]);

	return state;
};

export default useChannel;
