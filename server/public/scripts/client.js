console.log( 'js' );
const swal = require('sweetalert');

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready


//function sets up click listeners for the add button, transfer button and the delete/remove button
function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  });
  $('#viewKoalas').on('click', '.transferButton', transferKoala);
  $('#viewKoalas').on('click', '.delete', checkDelete);
}


//function will get koala information from database and use the render function to add koala to DOM
function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/holla',
  })
  .then(function(response){
    let koalas = response;
    render(koalas);
  })
  .catch (function(error){
    console.log('Could not get koalas');
    alert(`Could not get koalas`);
  })
} // end getKoalas


//function sends new koala data to server to then be added to the database-- upon successful adding to DB, will get database information and run render function to update DOM
function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 $.ajax({
   method: 'POST',
   url: '/holla',
   data: newKoala,
 })
 .then( function (response){
   getKoalas();
   clearInputs();
 })
 .catch(function (error){
   console.log('unable to save new koala');
   alert(`Unable to save new koala`);
 })
}

// function renders the DOM-- adds row to table with koala data and appends a remove button to remove koala and a ready to transfer
//button depending on ready for transfer status
function render(koalas){
  $('#viewKoalas').empty();
  for (let koala of koalas){
    let $tr;

    if (koala.transfer == 'false') {
      $tr = $(`
      <tr>
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.transfer}</td>
        <td>${koala.notes}</td>
        <td>
          <button class="transferButton">Ready For Transfer</button>
        </td>
        <td>
          <button class="delete">Euthanize</button>
        </td>
      </tr>
      `)} else {
        $tr = $(`
        <tr>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.transfer}</td>
          <td>${koala.notes}</td>
          <td></td>
          <td>
            <button class="delete">Euthanize</button>
          </td>
        </tr >
      `)}

    $('#viewKoalas').append($tr);
    $tr.data(koala);
    }
}

//function will send koala id data to server to then update the database if transfer button has been clicked-- changing koala transfer data
function transferKoala(){
    let $transferButton = $(this);
    let $tr = $transferButton.closest('tr');
    let koalaId = $tr.data('id');
    console.log(koalaId);

    $.ajax({
        method: 'PUT',
        url: `/holla/${koalaId}`,
        data: koalaId,
    })
    .then(function (response) {
        getKoalas();
    })
    .catch( function (error){
        console.log('Error updating transfer status');
        alert('Error updating transfer status')
    })
}

//function will clear input fields when koala has been added
function clearInputs() {
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
}

// delete koala by id gotten from data 
function deleteKoala(){
  console.log('in delete button');
  let deleteButton = $(this);
  let deletedRow = deleteButton.closest('tr');
  console.log('The deleted row will be,', deletedRow);
  let koalaId = deletedRow.data('id');
  console.log('Koala id is', koalaId);

  $.ajax({
    method: 'DELETE',
    url: `/holla/${koalaId}`
  })
  .then( function(response){
    getKoalas();
  }).catch( function(error) {
    console.log('Could not delete koala', error);
    alert(`Sorry! Could not delete koala`);

  })
}

function checkDelete(){
  swal({
    title: "Are you sure you want to euthanize?", 
    icon: "images/punchingKoala.gif:",
    buttons: true,
    dangerMode: true,
    })
    .then(function (value) {
      if (value === true ) {
        deleteKoala();
      }
      else {
        swal('They shall live another day!');
      }
    })
  }
