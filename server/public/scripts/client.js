console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

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
  $('#viewKoalas').on('click', '.transferButton', transferKoala)
}

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

function transferKoala(){
    let $transferButton = $(this);
    let $tr = $transferButton.closest('tr');
    let koalaId = $tr.data('id');
    console.log(koalaId);

    $.ajax({
        method: 'PUT',
        url: `/holla/${koalaId}`
    })
    .then(function (response) {
        getKoalas();
    })
    .catch( function (error){
        console.log('Error updating transfer status');
        alert('Error updating transfer status')
    })
}

function clearInputs() {
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
}
