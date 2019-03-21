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
      name: '#nameIn'.val(),
      age: '#ageIn'.val(),
      gender: '#genderIn'.val(),
      readyForTransfer: '#readyForTransferIn'.val(),
      notes: '#notesIn'.val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
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
   console.log('unable to save new koala')
   alert(`Unable to save new koala`);
 })
}
