import React from "react";
import axios from "axios";
import JadwalLokasi from "./JadwalLokasi";

function Jadwal() {
  const [lokasi, setlokasi] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [date, setDate] = React.useState("Date");
  const [filteredLokasi, setFilteredLokasi] = React.useState([]);

  const [idKota, setIdKota] = React.useState("ID");
  const [jadwal, setJadwal] = React.useState([]);
  const refQuery = React.useRef();
  const refDate = React.useRef();

  React.useEffect(() => {
    axios.get(`https://api.myquran.com/v1/sholat/kota/semua`).then((res) => {
      const lokasiList = res.data;
      setlokasi(lokasiList);
    });
  }, []);

  React.useEffect(() => {
    let filterLokasi = lokasi.filter((result) =>
      result.lokasi.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredLokasi(filterLokasi);
  }, [query, lokasi]);

  function handleChange() {
    setQuery(refQuery.current.value);

    let inputDate = refDate.current.value;
    // Chrome format YYYY-MM-DD
    let year = inputDate.substring(0, 4);
    let month = inputDate.substring(5, 7);
    let day = inputDate.substring(8, 10);

    setDate(`${year}/${month}/${day}`);
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .get(`https://api.myquran.com/v1/sholat/jadwal/${idKota}/${date}`)
      .then((res) => {
        const jadwalList = res.data.data.jadwal;
        setJadwal(jadwalList);
      });
  }

  return (
    <div className="m-5 m-md-0">
      <form className="row " onSubmit={handleSubmit}>
        <div className="mb-3 d-flex gap-2 col-12 col-md-5">
          <label for="kota" className="col-form-label">
            Kota/Kabupaten
          </label>

          <input
            type="text"
            className="form-control"
            id="kota"
            ref={refQuery}
            onChange={handleChange}
            required
            placeholder="ketik nama kota dan pilih"
          />
        </div>

        <div className="mb-3 d-flex gap-2 col-12 col-md-5">
          <label for="kota" className=" col-form-label">
            Hari/Tanggal
          </label>
          <input
            className="form-control"
            type="date"
            ref={refDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 col-md-2">
          <button
            className="d-flex justify-content-center w-100 btn btn-lg btn-primary"
            type="submit"
          >
            Set
          </button>
        </div>
      </form>

      <div className="row">
        <div className="d-flex gap-2 align-items-center">
          <h5
            className="text-start"
            style={{ wordWrap: "break-word", wordBreak: "break-all" }}
          >
            <span className="text-success">Request :</span>
            <p>
              https://api.myquran.com/v1/sholat/jadwal/
              <span className="text-warning">{idKota}</span>/
              <span className="text-warning">{date}</span>
            </p>
          </h5>
        </div>
        <div className="d-flex gap-5">
          <div>
            <h5>Subuh : </h5>{" "}
            <span> {jadwal !== [] ? jadwal.subuh : "id = ???"}</span>
          </div>
          <div>
            <h5>Dzuhur : </h5>{" "}
            <span> {jadwal !== [] ? jadwal.dzuhur : "id = ???"}</span>
          </div>
          <div>
            <h5>Ashar : </h5>{" "}
            <span> {jadwal !== [] ? jadwal.ashar : "id = ???"}</span>
          </div>
          <div>
            <h5>Maghrib : </h5>{" "}
            <span> {jadwal !== [] ? jadwal.maghrib : "id = ???"}</span>
          </div>
          <div>
            <h5>Isya : </h5>{" "}
            <span> {jadwal !== [] ? jadwal.isya : "id = ???"}</span>
          </div>
        </div>
      </div>

      {query.length >= 4 && (
        <div className="mt-3">
          {filteredLokasi.map((lokasiData) => (
            <JadwalLokasi
              key={lokasiData.id}
              lokasi={lokasiData}
              setIdKota={setIdKota}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Jadwal;
