const Booking = {};

//Catturo gli elementi
Booking.numeroPersoneW = document.getElementById("numero-persone-w");
Booking.numeroPersone = document.getElementById("numero-persone");
Booking.tavoliW = document.getElementById("tavoli-w");
Booking.tavoloSelezionato = document.getElementById("tavolo-selezionato");
Booking.messageStatus = document.getElementById("message-status");

// Funzione asincrona dove passiamo i dati della sala tramite file JSON
(async function costruisciSala() {
  Booking.sala = await fetch("sala.json");
  Booking.sala = await Booking.sala.json();
  Booking.tavoli = Booking.sala.tavoli;
  disponiTavoli(Booking.tavoli);
})();

// Funzione per creare i tavoli
function disponiTavoli(tavoli) {
  tavoli.forEach((tavolo, i) => {
    let classiTavolo = "tavolo ";
    let tavoloDom = document.createElement("div");
    tavoloDom.appendChild(document.createTextNode(i + 1));
    classiTavolo += tavolo.occupato ? "occupato " : "libero ";
    classiTavolo += tavolo.posti === 6 ? "x6" : "x4";
    tavoloDom.setAttribute("class", classiTavolo);
    Booking.tavoliW.appendChild(tavoloDom);
  });
}

// Gestione persone, aggiungi e togli persone
Booking.numeroPersoneW.addEventListener("click", (e) => {
  e.preventDefault();
  let numeroPersone = +Booking.numeroPersone.textContent;
  console.log(numeroPersone);
  if (e.target.id === "add") {
    Booking.numeroPersone.textContent = numeroPersone + 1;
  } else if (e.target.id === "sub" && numeroPersone > 1) {
    Booking.numeroPersone.textContent = numeroPersone - 1;
  }
});

//Gestire selezione di un tavolo
Booking.tavoliW.addEventListener("click", (e) => {
  let selezionato = +e.target.textContent;
  if (Booking.tavoli[selezionato - 1].occupato) {
    Booking.messageStatus.textContent = `Il tavolo ${selezionato} e' occupato`;
  } else {
    Booking.tavoloSelezionato.textContent = selezionato;
  }
});

//Gestione invio prenotazione
document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  if (Booking.tavoloSelezionato.textContent == "-") {
    Booking.messageStatus.textContent = `E' necessario selezionare un tavolo`;
    return;
  }
  sendBooking();
});

function sendBooking() {
  let bookingForm = new FormData();
  bookingForm.append("numero-persone", +Booking.numeroPersone.textContent);
  bookingForm.append("tavolo", +Booking.tavoloSelezionato.textContent);
  bookingForm.append("nome", document.forms[0].nome.value);
  bookingForm.append("nome", document.forms[0].email.value);
  Booking.messageStatus.textContent = `La tua prenotazione e' andata a buon fine`;
  document.forms[0].reset();
}
