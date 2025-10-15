import { useEffect, useState } from 'react';

interface HealthStatus {
    backend: "UP" | "DOWN";
    database: "DISCONNECTED" | "CONNECTED" | "CONNECTING" | "DISCONNECTING";
    frontend: "UP" | "DOWN";
}

export default function SystemHealth() {
    const [status, setStatus] = useState<HealthStatus | null>(null);

    const fetchStatus = async () => {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/health');
            const data = await res.json();
            setStatus({
                backend: data.server,
                database: data.database,
                frontend: "UP",
            });
        } catch {
            setStatus({
                backend: "DOWN",
                database: "DISCONNECTED",
                frontend: "DOWN",
            });
        }
    };

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 5000); // refresh every 5s
        return () => clearInterval(interval);
    }, []);

    if (!status) return <div>Loading system status...</div>;

    return (
        <div
            style={{
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '6px',
                width: '250px',
                backgroundColor: '#f9f9f9',
            }}
        >
            <h4>System Health</h4>
            {Object.entries(status).map(([key, value]) => (
                <div
                    key={key}
                    style={{
                        marginBottom: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <span
                        style={{
                            color: (value === 'UP' || value === 'CONNECTED') ? 'green' : 'red',
                            fontWeight: 'bold',
                        }}
                    >
                        {value}
                    </span>
                </div>
            ))}
        </div>
    );
}
