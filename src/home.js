import "./home.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faMoneyBill,
  faHouse,
  faShoppingBag,
  faGift,
  faUtensils,
  faNotesMedical,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const [show, setShow] = useState(false);
  const [banknamemodal, setbanknamemodal] = useState("");
  const [ammountmodal, setammountmodal] = useState("");
  let [defaultbanks, setdefaultbanks] = useState(["Cash", "Savings"]);

  let [calculation, setcalculation] = useState([
    { Balance: 1000 },
    { totalcash: 1000 },
    { totalbank: 0 },
    { totalsavings: 0 },
  ]);

  let [addedbanks, setaddedbanks] = useState([
    { Bankname: "Cash", CurrentCash: 1000 },
    { Bankname: "Savings", CurrentSavings: 0 },
  ]);

  let [have, sethave] = useState(1000);

  let [table2cash, settable2cash] = useState(1000);
  let [table2bank, settable2bank] = useState(0);
  let [table2savings, settable2savings] = useState(0);
  let [selected, setSelected] = useState(null);
  let [selected1, setSelected1] = useState(null);

  let [table3cash, settable3cash] = useState(1000);
  let [table3savings, settable3savings] = useState(0);

  let [othercalculation, setothercalculation] = useState([
    { income: 0 },
    { expense: 0 },
  ]);

  let [expenammount, setexpenammount] = useState("");
  let [transactionhistory, settransactionhistory] = useState([]);

  const expenseradio = document.getElementById("expenseradio");
  const handleClose = () => {
    setShow(false);
    setbanknamemodal("");
    setammountmodal("");
  };

  const handleChange = (event) => {
    setSelected("yes");
  };

  const handleChange1 = (event) => {
    setSelected("yes");
  };

  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const re = /^[A-Za-z0-9]+$/;
  const re1 = /^[A-Za-z]+$/;
  const re2 = /^[0-9]+$/;

  const banknamemodalref = useRef("");
  const ammountmodalref = useRef("");
  const expenaddref = useRef("");
  let date = new Date();
  let currentDate = date.toString();
  const bankvalue = defaultbanks.length;
  const sel = document.getElementById("bank-select");
  const opt = document.createElement("option");
  const house = document.getElementById("house");
  const gift = document.getElementById("gift");
  const dinner = document.getElementById("dinner");
  const medical = document.getElementById("medical");
  const shopping = document.getElementById("shopping");
  const table = document.getElementById("table1");
  let row2 = document.createElement("tr");
  let th1 = document.createElement("th");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");



  const data = {
    labels: ["Expense", "Income"],
    datasets: [
      {
        data: [othercalculation[1].expense, othercalculation[0].income],
        backgroundColor: ["rgb(225,100,0)", "rgb(0, 100, 0)"],
        hoverOffset: 30,
      },
    ],
  };

  const banknamemodalhandler = (e) => {
    const { value } = e.target;

    if (value === "" || re1.test(value)) {
      setbanknamemodal(e.target.value);
    }
  };

  const ammountmodalhandler = (e) => {
    const { value } = e.target;

    if (value === "" || re2.test(value)) {
      setammountmodal(e.target.value);
    }
  };

  const expenammountHandler = (e) => {
    const { value } = e.target;

    if (value === "" || re2.test(value)) {
      setexpenammount(e.target.value);
    }
  };

  useEffect(() => {
    const useremail = localStorage.getItem("useremail");
  }, []);

  const logoutHandler = () => {
    if (window.confirm("Are you sure you want to logout?") === true) {
      localStorage.clear();
      navigate("/");
    }
  };

  const AddBankHandler = (e) => {
    const convertedammount = Number(ammountmodalref.current.value);
    if (
      banknamemodalref.current.value === "" ||
      ammountmodalref.current.value === ""
    ) {
      window.alert("Please fill all the feilds");
    } else {
      let count = 0;
      defaultbanks.forEach(function (item, index) {
        if (item === banknamemodalref.current.value) {
          count = count + 1;
        }
      });

      if (count > 0) {
        window.alert("The bank is already added!");
      } else {
        let convertedenternedbankname = banknamemodalref.current.value;
        let convertedenternedammount = ammountmodalref.current.value;
        defaultbanks.push(banknamemodalref.current.value);
        opt.text = banknamemodalref.current.value;
        sel.add(opt, sel.options[bankvalue]);

        const table = document.getElementById("table3");
        let row2 = document.createElement("tr");
        let th = document.createElement("th");
        let td = document.createElement("td");

        th.innerHTML = `<th>${banknamemodalref.current.value}</th>`;
        td.innerHTML = `<th>${ammountmodalref.current.value}</th>`;

        table.appendChild(row2);
        row2.appendChild(th);
        row2.appendChild(td);

        let calc1 = table2bank + convertedammount;
        let calc2 = have + convertedammount;

        var convertedammount1 = parseInt(ammountmodalref.current.value);

        addedbanks.push({
          Bankname: banknamemodalref.current.value,
          CurrentBank: convertedammount1,
        });

        calculation[0] = { Balance: calc2 };
        calculation[2] = { totalbank: calc1 };

        settable2bank(calc1);
        sethave(calc2);

        axios.post("http://localhost:4000/auths/bank/");



      }

      setShow(false);
      setbanknamemodal("");
      setammountmodal("");
    }

    e.preventDefault();
  };

  let a = 0;
  const expenaddHandler = (e) => {
    const ammountin = document.getElementById("ammount-input");
    if (ammountin.value.length === 0) {
      window.alert("Please select all the feilds");
    } else {
      const select1 = document.getElementById("bank-select");
      let selected1 = select1.selectedIndex;
      let selected = select1.options[select1.selectedIndex].text;
      const convertedammount = Number(expenaddref.current.value);

      if (expenseradio.checked === true) {
        if (selected === "Cash") {
          if (convertedammount > addedbanks[0].CurrentCash) {
            a = 1;
            window.alert("Insufficent Cash");
          } else {
            a = 0;

            let calc1 = table2cash - convertedammount;
            let calc2 = have - convertedammount;
            settable2cash(calc1);
            settable3cash(calc1);
            sethave(calc2);

            calculation[0] = { Balance: calc2 };
            calculation[1] = { totalcash: calc1 };
            addedbanks[0] = { Bankname: "Cash", CurrentCash: calc1 };
          }
        } else if (selected === "Savings") {
          if (convertedammount > addedbanks[1].CurrentSavings) {
            a = 1;
            window.alert("Insufficent Savings");
          } else {
            a = 0;
            let calc3 = table2savings - convertedammount;
            let calc4 = have - convertedammount;
            settable2savings(calc3);
            settable3savings(calc3);
            sethave(calc4);

            calculation[0] = { Balance: calc4 };
            calculation[3] = { totalsavings: calc3 };
            addedbanks[1] = { Bankname: "Savings", CurrentSavings: calc3 };
          }
        } else {
          if (convertedammount > addedbanks[selected1].CurrentBank) {
            a = 1;
            window.alert("Insufficent Cash in the Bank");
          } else {
            a = 0;
            var table4 = document.getElementById("table3");
            let calc1 = table2bank - convertedammount;
            let calc2 = have - convertedammount;

            let calc3 = addedbanks[selected1].CurrentBank - convertedammount;
            settable2bank(calc1);

            addedbanks[selected1].CurrentBank = calc3;
            sethave(calc2);
            var x = document.getElementById("table3").rows.length - 1;

            let c = 0;
            for (let i = 2; i < x; i++) {
              table4.deleteRow(x - c);
              c = c + 1;
            }
            let b = 2;
            while (b < addedbanks.length) {
              let row1 = document.createElement("tr");
              let th = document.createElement("th");
              let td = document.createElement("td");
              th.innerHTML = `<th>${addedbanks[b].Bankname}</th>`;
              td.innerHTML = `<th>${addedbanks[b].CurrentBank}</th>`;
              table4.appendChild(row1);
              row1.appendChild(th);
              row1.appendChild(td);

              b++;
            }
          }
        }

        if (a == 0) {
          let calc3 = othercalculation[1].expense + convertedammount;
          othercalculation[1] = { expense: calc3 };

          if (house.checked === true) {
            th1.innerHTML = `<th>House</th>`;
            td1.innerHTML = `<th>${selected}</th>`;
            td2.innerHTML = `<th>${currentDate}</th>`;
            td3.innerHTML = `<th>-$${convertedammount}</th>`;
            td3.style.color = "red";
            table.appendChild(row2);
            row2.appendChild(th1);
            row2.appendChild(td1);
            row2.appendChild(td2);
            row2.appendChild(td3);
            row2.appendChild(td3);
            transactionhistory.push({
              type: "House",
              Bankname: selected,
              Date: currentDate,
              Ammount: convertedammount,
            });
          } else if (gift.checked === true) {
            th1.innerHTML = `<th>Gift</th>`;
            td1.innerHTML = `<th>${selected}</th>`;
            td2.innerHTML = `<th>${currentDate}</th>`;
            td3.innerHTML = `<th>-$${convertedammount}</th>`;
            td3.style.color = "red";
            table.appendChild(row2);
            row2.appendChild(th1);
            row2.appendChild(td1);
            row2.appendChild(td2);
            row2.appendChild(td3);
            row2.appendChild(td3);
            transactionhistory.push({
              type: "Gift",
              Bankname: selected,
              Date: currentDate,
              Ammount: convertedammount,
            });
          } else if (dinner.checked === true) {
            th1.innerHTML = `<th>Dinner</th>`;
            td1.innerHTML = `<th>${selected}</th>`;
            td2.innerHTML = `<th>${currentDate}</th>`;
            td3.innerHTML = `<th>-$${convertedammount}</th>`;
            td3.style.color = "red";
            table.appendChild(row2);
            row2.appendChild(th1);
            row2.appendChild(td1);
            row2.appendChild(td2);
            row2.appendChild(td3);
            transactionhistory.push({
              type: "Dinner",
              Bankname: selected,
              Date: currentDate,
              Ammount: convertedammount,
            });
          } else if (medical.checked === true) {
            th1.innerHTML = `<th>Medical</th>`;
            td1.innerHTML = `<th>${selected}</th>`;
            td2.innerHTML = `<th>${currentDate}</th>`;
            td3.innerHTML = `<th>-$${convertedammount}</th>`;
            td3.style.color = "red";
            table.appendChild(row2);
            row2.appendChild(th1);
            row2.appendChild(td1);
            row2.appendChild(td2);
            row2.appendChild(td3);
            transactionhistory.push({
              type: "Medical",
              Bankname: selected,
              Date: currentDate,
              Ammount: convertedammount,
            });
          } else {
            th1.innerHTML = `<th>Shopping</th>`;
            td1.innerHTML = `<th>${selected}</th>`;
            td2.innerHTML = `<th>${currentDate}</th>`;
            td3.innerHTML = `<th>-$${convertedammount}</th>`;
            td3.style.color = "red";
            table.appendChild(row2);
            row2.appendChild(th1);
            row2.appendChild(td1);
            row2.appendChild(td2);
            row2.appendChild(td3);
            transactionhistory.push({
              type: "Shopping",
              Bankname: selected,
              Date: currentDate,
              Ammount: convertedammount,
            });
          }
        }
      } else {
        if (selected === "Cash") {
          let calc1 = table2cash + convertedammount;
          let calc2 = have + convertedammount;
          settable2cash(calc1);
          settable3cash(calc1);
          sethave(calc2);
          calculation[0] = { Balance: calc2 };
          calculation[1] = { totalcash: calc1 };
          addedbanks[0] = { Bankname: "Cash", CurrentCash: calc1 };
        } else if (selected === "Savings") {
          let calc1 = table2savings + convertedammount;
          let calc2 = have + convertedammount;
          settable2savings(calc1);
          settable3savings(calc1);
          sethave(calc2);
          calculation[0] = { Balance: calc2 };
          calculation[3] = { totalsavings: calc1 };

          addedbanks[1] = {
            Bankname: "Savings",
            CurrentSavings: calc1,
          };
        } else {
          var table4 = document.getElementById("table3");
          let calc1 = table2bank + convertedammount;
          let calc2 = have + convertedammount;

          let calc3 = addedbanks[selected1].CurrentBank + convertedammount;
          settable2bank(calc1);
          addedbanks[selected1].CurrentBank = calc3;
          sethave(calc2);

          var x = document.getElementById("table3").rows.length - 1;
          let c = 0;
          for (let i = 2; i < x; i++) {
            table4.deleteRow(x - c);
            c = c + 1;
          }
          let b = 2;
          while (b < addedbanks.length) {
            let row1 = document.createElement("tr");
            let th = document.createElement("th");
            let td = document.createElement("td");
            th.innerHTML = `<th>${addedbanks[b].Bankname}</th>`;
            td.innerHTML = `<th>${addedbanks[b].CurrentBank}</th>`;
            table4.appendChild(row1);
            row1.appendChild(th);
            row1.appendChild(td);

            b++;
          }
        }
        let calc3 = othercalculation[0].income + convertedammount;
        othercalculation[0] = { income: calc3 };

        if (house.checked === true) {
          th1.innerHTML = `<th>House</th>`;
          td1.innerHTML = `<th>${selected}</th>`;
          td2.innerHTML = `<th>${currentDate}</th>`;
          td3.innerHTML = `<th>-$${convertedammount}</th>`;
          td3.style.color = "green";
          table.appendChild(row2);
          row2.appendChild(th1);
          row2.appendChild(td1);
          row2.appendChild(td2);
          row2.appendChild(td3);
          transactionhistory.push({
            type: "House",
            Bankname: selected,
            Date: currentDate,
            Ammount: convertedammount,
          });
        } else if (gift.checked === true) {
          th1.innerHTML = `<th>Gift</th>`;
          td1.innerHTML = `<th>${selected}</th>`;
          td2.innerHTML = `<th>${currentDate}</th>`;
          td3.innerHTML = `<th>-$${convertedammount}</th>`;
          td3.style.color = "green";
          table.appendChild(row2);
          row2.appendChild(th1);
          row2.appendChild(td1);
          row2.appendChild(td2);
          row2.appendChild(td3);
          transactionhistory.push({
            type: "Gift",
            Bankname: selected,
            Date: currentDate,
            Ammount: convertedammount,
          });
        } else if (dinner.checked === true) {
          th1.innerHTML = `<th>Dinner</th>`;
          td1.innerHTML = `<th>${selected}</th>`;
          td2.innerHTML = `<th>${currentDate}</th>`;
          td3.innerHTML = `<th>-$${convertedammount}</th>`;
          td3.style.color = "green";
          table.appendChild(row2);
          row2.appendChild(th1);
          row2.appendChild(td1);
          row2.appendChild(td2);
          row2.appendChild(td3);
          transactionhistory.push({
            type: "Dinner",
            Bankname: selected,
            Date: currentDate,
            Ammount: convertedammount,
          });
        } else if (medical.checked === true) {
          th1.innerHTML = `<th>Medical</th>`;
          td1.innerHTML = `<th>${selected}</th>`;
          td2.innerHTML = `<th>${currentDate}</th>`;
          td3.innerHTML = `<th>-$${convertedammount}</th>`;
          td3.style.color = "green";
          table.appendChild(row2);
          row2.appendChild(th1);
          row2.appendChild(td1);
          row2.appendChild(td2);
          row2.appendChild(td3);
          transactionhistory.push({
            type: "Medical",
            Bankname: selected,
            Date: currentDate,
            Ammount: convertedammount,
          });
        } else {
          th1.innerHTML = `<th>Shopping</th>`;
          td1.innerHTML = `<th>${selected}</th>`;
          td2.innerHTML = `<th>${currentDate}</th>`;
          td3.innerHTML = `<th>-$${convertedammount}</th>`;
          td3.style.color = "green";
          table.appendChild(row2);
          row2.appendChild(th1);
          row2.appendChild(td1);
          row2.appendChild(td2);
          row2.appendChild(td3);
          transactionhistory.push({
            type: "Shopping",
            Bankname: selected,
            Date: currentDate,
            Ammount: convertedammount,
          });
        }
      }
    }

    localStorage.setItem("othercalculation", JSON.stringify(othercalculation));
    localStorage.setItem("calculation", JSON.stringify(calculation));

    localStorage.setItem(
      "transactionhistory",
      JSON.stringify(transactionhistory)
    );

    localStorage.setItem("defaultbanks", JSON.stringify(defaultbanks));

    localStorage.setItem("addedbanks", JSON.stringify(addedbanks));

    e.preventDefault();
  };

  return (
    <div>
      {/* <div id="loader"></div> */}
      <div id="myDiv">
        <div className="container-fluid">
          <div className="row">
            {/* <!-- //left column --> */}
            <div className="col-lg-6 left">
              {/* <!-- container1-l --> */}
              <div className="container1-l">
                <div>
                  <strong>
                    <h3>Add Transactions</h3>
                  </strong>
                </div>
                <input
                  type="number"
                  id="ammount-input"
                  placeholder="Enter Ammount"
                  min="0"
                  onChange={expenammountHandler}
                  value={expenammount}
                  ref={expenaddref}
                />{" "}
                <label htmlFor="bank-select"></label>
                <select name="bank-select" id="bank-select">
                  <option value="A">Cash</option>
                  <option value="B">Savings</option>
                </select>
                <input
                  type="radio"
                  id="expenseradio"
                  name="division"
                  value="Expense"
                  onChange={handleChange}
                />{" "}
                <button disabled id="expensebtn" value="expensebtn">
                  <FontAwesomeIcon icon={faWallet} />
                  Expense
                </button>
                <input
                  type="radio"
                  id="incomeradio"
                  name="division"
                  value="incomebtn"
                  onChange={handleChange}
                />
                <h1 id="incomevalue" style={{ display: "none" }}>
                  00
                </h1>
                <button disabled id="incomebtn" value="Incomebtn">
                  <FontAwesomeIcon icon={faMoneyBill} />
                  Income
                </button>
              </div>

              <br />
              <div className="container2-l">
                <div style={{ marginLeft: "50px" }}>
                  <strong>
                    <h4>Choose the Category</h4>
                  </strong>
                </div>
                <div id="expen-icon">
                  <button disabled>
                    <FontAwesomeIcon icon={faHouse} />
                  </button>{" "}
                  <button disabled>
                    <FontAwesomeIcon icon={faShoppingBag} />
                  </button>{" "}
                  <button disabled>
                    <FontAwesomeIcon icon={faGift} />
                  </button>{" "}
                  <button disabled>
                    <FontAwesomeIcon icon={faUtensils} />
                  </button>{" "}
                  <button disabled>
                    <FontAwesomeIcon icon={faNotesMedical} />
                  </button>{" "}
                </div>
                <div id="expen-selection">
                  <input
                    type="radio"
                    id="house"
                    name="expandivision"
                    value="housebtn"
                  />{" "}
                  <input
                    type="radio"
                    id="shopping"
                    name="expandivision"
                    value="shoppingbtn"
                    onChange={handleChange1}
                  />{" "}
                  <input
                    type="radio"
                    id="gift"
                    name="expandivision"
                    value="giftbtn"
                    onChange={handleChange1}
                  />{" "}
                  <input
                    type="radio"
                    id="dinner"
                    name="expandivision"
                    value="dinnerbtn"
                    onChange={handleChange1}
                  />{" "}
                  <input
                    type="radio"
                    id="medical"
                    name="expandivision"
                    value="medicalbtn"
                    onChange={handleChange1}
                  />{" "}
                </div>
                <div id="expen-title">
                  <strong>
                    <span>Home</span>
                    <span></span> <span>Shopping</span> <span>Gift</span>{" "}
                    <span>Dinner</span> <span>Medical</span>
                  </strong>
                </div>
                <div id="expen-add">
                  <button onClick={expenaddHandler}>Add</button>
                </div>
              </div>

              {/* <!-- left table --> */}
              <div className="container3-l">
                <div className="table-l">
                  <br />
                  <strong>
                    <h4 style={{ marginLeft: "50px" }}>Transaction History</h4>
                  </strong>
                  <div id="table1" className="scroll1">
                    <table style={{ backgroundColor: "white" }}></table>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- right column --> */}
            <div className="col-lg-6 right">
              <div className="container1-r">
                <div className="userbtn" id="userbtn">
                  <button onClick={logoutHandler}>
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                </div>
                <br />
                <div>
                  <strong>
                    <span id="havetotal">What you Have?</span>
                  </strong>
                </div>
              </div>
              <div className="container2-r">
                <h2 id="balance">{have}</h2>
              </div>
              <div className="container3-r">
                <div id="table2">
                  <table style={{ backgroundColor: "white" }}>
                    <tbody>
                      <tr>
                        <th>Cash</th>
                        <th>Bank</th>
                        <th>Saving</th>
                      </tr>
                      <tr
                        style={{ color: "(55, 115, 236)", fontWeight: "bold" }}
                      >
                        <td id="table2-cash">{table2cash}</td>
                        <td id="table2-bank">{table2bank}</td>
                        <td id="table2-saving">{table2savings}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="add-bank">
                <Button variant="primary" onClick={handleShow}>
                  Add Bank Here
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Meezan Bank"
                          autoFocus
                          ref={banknamemodalref}
                          value={banknamemodal}
                          onChange={banknamemodalhandler}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Ammount</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="1000"
                          ref={ammountmodalref}
                          value={ammountmodal}
                          onChange={ammountmodalhandler}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={AddBankHandler}>
                      Add Bank
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>

              <div className="container4-r">
                <div className="scroll">
                  <table id="table3">
                    <tbody>
                      <tr>
                        <th>Cash</th>
                        <td id="table3-cash">{table3cash}</td>
                      </tr>
                      <tr>
                        <th>Saving</th>
                        <td id="table3-saving">{table2savings}</td>
                      </tr>
                      <tr style={{ display: "none" }}>
                        <td id="table3-bank">00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3>Overview</h3>
                <div
                  id="container-chart"
                  style={{
                    position: "relative",
                    height: "220px",
                    width: "220px",
                    display: "flex",
                    alignContent: "center",
                    marginLeft: "100px",
                  }}
                >
                  <Doughnut id="chart" data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
