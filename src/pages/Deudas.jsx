import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import DebtForm from "../components/DebtForm";
import DebtCard from "../components/DebtCard";

import { obtenerDeudas } from "../utils/debtStorage";

function Deudas() {

    const [deudas, setDeudas] = useState([]);

    const cargarDeudas = () => {
        setDeudas(obtenerDeudas());
    };

    useEffect(() => {
        cargarDeudas();
    }, []);

    const total = deudas.reduce(
        (acc, d) => acc + d.saldoPendiente,
        0
    );

    return (

        <MainLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        Gestión de Deudas
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Controla todas tus deudas y registra abonos.
                    </p>

                </div>

                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

                    <h2 className="text-xl font-semibold">
                        Total pendiente
                    </h2>

                    <p className="text-4xl font-bold mt-3 text-red-400">

                        $
                        {total.toLocaleString()}

                    </p>

                </div>

                <DebtForm actualizar={cargarDeudas} />

                <div className="grid md:grid-cols-2 gap-6">

                    {deudas.length === 0 ? (

                        <div className="text-slate-400">
                            No hay deudas registradas.
                        </div>

                    ) : (

                        deudas.map(deuda => (

                            <DebtCard
                                key={deuda.id}
                                deuda={deuda}
                                actualizar={cargarDeudas}
                            />

                        ))

                    )}

                </div>

            </div>

        </MainLayout>

    );

}

export default Deudas;