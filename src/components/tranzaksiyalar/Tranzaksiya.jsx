import { useForm } from "react-hook-form";
import "./tranzaksiya.css";
import { useContext, useEffect, useState } from "react";
import { contextsTransaction } from "../../context/ContextApi";
import { IoMdSearch } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Tranzaksiya() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { valyutes } = useContext(contextsTransaction);
  const [radio, setRadio] = useState(false);
  const [change, setChange] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 600, // animatsiya davomiyligi
      easing: "ease-in-out", // animatsiyaning tezligi
      once: true, // faqat bir marta ishga tushadi
    });
  }, []);

  const prevItem = JSON.parse(localStorage.getItem("transactions")) || [];
  const onSubmit = (data) => {
    if (radio) {
      data.category = "";
    }
    const newData = [...prevItem, data];

    localStorage.setItem("transactions", JSON.stringify(newData));
    setValue("category", "");
    window.location.reload();
    reset();
  };
  const hanldeChangeRadioValue = (value) => {
    setRadio(value.target.value === "true");
  };

  const { allDaromad, allXarajat } = prevItem.reduce(
    (acc, item) => {
      const summa = Number((item.amount / item.usd).toFixed(2));
      if (item.redioValue === "true") {
        acc.allDaromad += summa; // Daromadlarni yig'ish
      } else {
        -(acc.allXarajat += summa); // Xarajatlarni yig'ish
      }
      return acc;
    },
    { allDaromad: 0, allXarajat: 0 }
  );

  // Filter

  const filteredTransactions = prevItem.filter((item) => {
    return (
      (item.category &&
        item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.date && item.date.includes(searchQuery))
    );
  });
  return (
    <div>
      <div className="container mt-4">
        <div className="d-flex justify-content-between transac">
          <h2>Tranzaksiyalar</h2>
          <div className="d-flex align-items-center gap-2 ">
            <div className="search input-group ">
              <input
                type="text"
                className="form-control"
                placeholder="Izlash (Sana/Kategoriya)"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-secondary">
                <IoMdSearch />
              </button>
            </div>
            <div className="">
              <button
                className="btn btn-success w-100"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Tranzaksiya qo`shish
              </button>
            </div>
          </div>
        </div>

        {/* modal yani tranzaksiya qo'shish */}
        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Tranzaksiya qo`shish
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3 d-flex justify-content-around">
                    <div className="d-flex gap-2 align-items-center form-check">
                      <input
                        required
                        name="flexRadioDefault"
                        type="radio"
                        id="xarajat"
                        value={false}
                        className="form-check-input"
                        {...register("redioValue")}
                        onChange={(e) => hanldeChangeRadioValue(e)}
                      />
                      <label htmlFor="xarajat" className="btn btn-danger">
                        Xarajat
                      </label>
                    </div>
                    <div className="d-flex gap-2 align-items-center form-check">
                      <input
                        required
                        name="flexRadioDefault"
                        type="radio"
                        id="daromad"
                        value={true}
                        className="form-check-input"
                        {...register("redioValue")}
                        onChange={(e) => hanldeChangeRadioValue(e)}
                      />
                      <label htmlFor="daromad" className="btn btn-primary">
                        Daromad
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div>
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Miqdori
                      </label>
                      <div className="d-flex input-group">
                        <input
                          required
                          type="number"
                          className="form-control "
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          {...register("amount")}
                        />
                        <select
                          className="btn btn-outline-secondary "
                          onChange={(e) => {
                            const selectedValue =
                              valyutes.find(
                                ([key]) => key === e.target.value
                              )?.[1] || 1;
                            const selectedUsdValue =
                              valyutes.find(
                                ([key]) => key === e.target.value
                              )?.[0] || "USD";
                            setValue("usd", selectedValue);
                            setValue("sumKey", selectedUsdValue),
                              setChange(true);
                          }}
                          defaultValue="1"
                          required
                        >
                          <option value="1">Tanlash</option>
                          {valyutes?.map(([key], index) => (
                            <option key={index} value={key}>
                              {key}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {!radio && (
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Kategoriyasi
                      </label>
                      <select
                        className="form-control"
                        {...register("category", {
                          required: "Kategoriyani tanlang",
                        })}
                      >
                        <option value="">Tanlang</option>
                        <option value="Oziq-ovqat">Oziq-ovqat</option>
                        <option value="Ko'ngilochar">Ko`ngilochar</option>
                        <option value="Transport">Transport</option>
                        <option value="Sayohat">Sayohat</option>
                      </select>
                    </div>
                  )}
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail3" className="form-label">
                      Sanasi
                    </label>
                    <input
                      required
                      type="date"
                      className="form-control"
                      id="exampleInputEmail3"
                      aria-describedby="emailHelp"
                      {...register("date")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail4" className="form-label">
                      Izoh
                    </label>
                    <textarea
                      required
                      type="text"
                      className="form-control"
                      id="exampleInputEmail4"
                      aria-describedby="emailHelp"
                      {...register("description")}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`${
                      change ? " btn-primary " : ""
                    } btn float-end btn-info`}
                    disabled={!change}
                  >
                    Qo`shish
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Daromad section */}
        <div className="d-flex justify-content-around mt-3 balances">
          <div className=" card" data-aos="fade-right">
            <h3 className="fs-5">Jami Daromad</h3>
            <p className="fs-3 mt-4 fw-medium">{allDaromad} $</p>
          </div>
          <div className=" card" data-aos="zoom-in">
            <h3 className="fs-5">Jami Xarajat</h3>
            <p className="fs-3 mt-4 fw-medium">{allXarajat} $</p>
          </div>
          <div className=" card" data-aos="fade-left">
            <h3 className="fs-5">Sof Balance</h3>
            <p className="fs-3 mt-4 fw-medium">{allDaromad - allXarajat} $</p>
          </div>
        </div>

        {/* tranzaksiyalar */}
        <div>
          {filteredTransactions?.map((item, index) => {
            let status = true;
            if (item.redioValue === "true") {
              status = true;
            } else {
              status = false;
            }

            const summa = Math.abs(Number((item.amount / item.usd).toFixed(3)));

            return (
              <div
                key={index}
                className={` pt-4 py-2 px-3 mt-3 transition d-flex justify-content-between align-items-center ${
                  status ? "daromad" : "xarajat"
                }`}
                data-aos="zoom-out-up"
              >
                <div>
                  <h4>
                    {item?.category ? item?.category : "Daromad"} -{" "}
                    <span className="fs-6">
                      {item.usd.toFixed(2)} {item.sumKey}
                    </span>
                  </h4>
                  <p>{item.description}</p>
                </div>
                <div>
                  <h6>
                    {status ? "" : "-"}
                    {summa} $
                  </h6>
                  <p>{item.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
