import React from "react";

export default function JadwalLokasi({ lokasi, setIdKota }) {
  function handleSet() {
    setIdKota(lokasi.id);
  }
  return (
    <button
      onClick={handleSet}
      className="mb-1 card bg-info text-dark"
    >
      <div className="card-body">
        <div>id : {lokasi.id}</div>
        <div>Lokasi : {lokasi.lokasi}</div>
      </div>
    </button>
  );
}
