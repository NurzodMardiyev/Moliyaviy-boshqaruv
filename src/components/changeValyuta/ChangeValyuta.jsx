import { useMutation, useQueryClient } from "react-query";
import { money } from "../../feature/queries";
import { useContext, useEffect, useState } from "react";
import { contextsTransaction } from "../../context/ContextApi";
export default function ChangeValyuta() {
  const queryClient = useQueryClient();
  const { valyutes, setValyutes } = useContext(contextsTransaction);
  const [inputValue, setInputValue] = useState(0);
  const [fromCurrency, setFromCurrency] = useState(1); // birinchi tanlash valyutasi
  const [toCurrency, setToCurrency] = useState(1); //ikkinchi tanlashniki
  const [result, setResult] = useState(0); // natija

  // API dan valyutalar olish uchun mutation
  const changeVal = useMutation(
    money.transition,
    {
      onSuccess: (response) => {
        setValyutes(Object.entries(response.conversion_rates));
        queryClient.invalidateQueries();
      },
    },
    {
      onError: () => {
        console.log("error");
      },
    }
  );

  // Komponent yuklanganda valyutalar ro'yxatini olish
  useEffect(() => {
    changeVal.mutate();
  }, []);

  const handleChangeValyuta = () => {
    if (inputValue > 0 && fromCurrency && toCurrency) {
      setResult((inputValue / fromCurrency) * toCurrency);
    } else {
      setResult(0);
    }
  };

  return (
    <div>
      <div className="container my-3 ">
        <div>
          <h2>Valyuta kurslari</h2>
        </div>
        <div className="d-flex flex-column align-items-center gap-3">
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="Miqdorni kiriting"
              onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
            />
            <select
              className="btn btn-secondary"
              onChange={(e) => {
                const selectedValue =
                  valyutes.find(([key]) => key === e.target.value)?.[1] || 1;
                setFromCurrency(selectedValue); // Tanlangan valyutaning qiymatini olish
              }}
            >
              {valyutes?.map(([key], index) => (
                <option key={index} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button className="btn btn-primary" onClick={handleChangeValyuta}>
              Almashtirish
            </button>
          </div>

          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={result || ""}
              readOnly
              placeholder="Natija"
            />
            <select
              className="btn btn-secondary"
              onChange={(e) => {
                const selectedValue =
                  valyutes.find(([key]) => key === e.target.value)?.[1] || 1;
                setToCurrency(selectedValue);
              }}
            >
              {valyutes?.map(([key], index) => (
                <option key={index} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
