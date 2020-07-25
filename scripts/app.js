class Calculate {
	constructor(){
		this.numPad = document.querySelector('.calc_numpad');
		this.operaterPad = document.querySelector('.calc_operaters');
		this.calcInput = document.querySelector('.calc_input');
		this.calcOutput = document.querySelector('.calc_output');
		this.errorAlert = document.querySelector('.clac_errors');
		
		//operater watch
		this.operater = false;
		
		//when final answer provided this will be set to true for new sum
		this.answer = false;
		this.events();
		
		
		
		
		
	}
	
	
	events(){
		
	   this.numPad.addEventListener("click", e => this.numberInput(e));
	   this.operaterPad.addEventListener("click", e => this.calculateSum(e));
		
		
	}
	
   //create number string on user number input
   numberInput(e){
	   //allow for font awesome misclick
	   if(typeof e.target.value === 'undefined'){
		   
		   e.target.value = e.target.parentNode.getAttribute('value');
	   }
	   //clear existing unused answer 
	   if(this.answer === true) {
		   
		   this.calcOutput.innerHTML = ''
		   this.answer = false;
		   
	   }
		
		//check user input type back 
		if(e.target.value === 'back'){
			
			// back was selected remove last entry
		const str = this.calcInput.innerHTML;
		const removeLast = str.substring(0,str.length -1);
		
		this.calcInput.innerHTML = removeLast;
		
		return false;
		}
		
		if(e.target.value === '-'){
		
		 //check input is blank
         if(this.calcInput.innerHTML === ''){
			 
					//add negative symbol only if blank
		this.calcInput.innerHTML = e.target.value;
		this.operater = false; 
			 
			 
		 }else{
	       //if not blank neg symbol must come before numbers.
		 this.error("Negative symbol must be first symbol please use minus for operations");
		 
		 }
			
		
			
			
       return false;
		}
		
		if(e.target.value === '.'){
		
		 //check input is blank
         if(this.calcInput.innerHTML === ''){
			 
			  //blank can't ad decimal
		 this.error("decimal symbol must come after numbers");
			 
					
			 
			 
		 }else{
	      //add decimal only after numbers
		this.calcInput.innerHTML += e.target.value;
		this.operater = false; 
		 
		 }
			
		
			
			
       return false;
		}
		
		
		
			//number was selected add to list
		this.calcInput.innerHTML += e.target.value;
		this.operater = false;
	}
	
	
	//build sum on user operater input
	calculateSum(e){
		  //allow for font awesome misclick
	   if(typeof e.target.value === 'undefined'){
		   
		   e.target.value = e.target.parentNode.getAttribute('value');
		   
		   
	   }
		this.answer = false;
		
		
		if(e.target.value === 'clrall'){
		
		 this.clrAll();
		 
		 return false;
			}
			
	let val = this.calcInput.innerHTML;
	this.calcInput.innerHTML = '';
	let sum = this.calcOutput.innerHTML;
	
//if answer but no input use answer for input.
const checklist = [' + ',' - ',' * ',' / '];

if(val === '' && sum !== ''){
     val  = sum;
	 sum = '';

 
 for(let el of checklist){
	if(val.includes(el)){
     
	 this.operater = true;
	 
	 break;
     }else {

     this.operater = false;
    }		
 }
	
}else if(val !== '' && sum !== ''){
	
	
	for(let el of checklist){
	if(val.includes(el)){
     
	 this.operater = true;
	 
	 break;
     }else {

      this.calcOutput.innerHTML = '';
    }		
 }
	
}





// assign 0 value if no user input or answer input
if(val === '') {
	
	val = '0';
	
}

//check sum state
if( sum === '' && this.operater === false){
	
	//the start sum isnt in progress
this.calcOutput.innerHTML = `${val} ${e.target.value} `;
this.operater = true;

		 
		
	}else if(this.operater === true){
		
		this.error("Can't use double operater");
		
	
	
	}
	else {
		//sum in progress
		sum = `${sum} ${val}`
		
		
		if(e.target.value === '='){
		this.answer = true;
		
		//the end display answer only
		this.calcOutput.innerHTML = `${eval(sum)}`;
		
		
		}
	else{
		
			//sum continues display answer and new operater
			this.calcOutput.innerHTML =`${eval(sum)} ${e.target.value} `;
			this.operater = true;
			
		
		}
		
	}
	
 }
 
 clrAll(){
	 
	 this.calcInput.innerHTML = '';
	 this.calcOutput.innerHTML = '';
	 //reset operater
		this.operater = false;
		
		//reset answer
		this.answer = false;
		
		
 }
 
error(msg){
	
	
	
	this.errorAlert.innerHTML = `<p class=" w-100 py-2 bg-white font-weight-bold text-danger text-center">${msg}</p>`
	
	//clear after 3 secs
	setTimeout(()=> {
		   this.clearAlert();
	   }, 3000);
}

clearAlert(){
	
 this.errorAlert.innerHTML = '';	
	
}
	
}

const sum = new Calculate;