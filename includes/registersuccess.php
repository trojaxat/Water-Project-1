<?php
//something to change the id of loginColumn back to login with success register msg

 <div class="col-sm" id="loginColumn" style="text-align:left">
            <label for="id07">
                     <input class="registerbutton" id="registerToggle" type="submit" onClick = "registerToggle()" value="Register">
            </label>
            <div id="login" style="display:blocked">
                <form  id="frmLogin" action="includes/checklogin.php" autocomplete="on">
                     <h3 id="id07">Log in</h3>

                     <p> 
                          <label for="username" class="uname" data-icon="u" >Username:</label>
                          <input id="loginUsername" name="username" required="required" type="text" placeholder="Username"/>
                     </p>
                     <p> 
                          <label for="password" class="youpasswd" data-icon="p">Password:</label>
                          <input id="loginPassword" name="password" required="required" type="password" placeholder="Password" /> 
                     </p>
                     <p class="keeplogin"> 
                          <input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" /> 
                          <label for="loginkeeping">Keep me logged in</label>
                     </p>
                     <p class="login button"> 
                          <input name="login" type="submit" value="Login" /> 
                     </p>
                </form>
            </div>
            
        <div id="register" style="display:none">
            <form action="includes/register.php" autocomplete="on" method="POST"> 
                <h1> Sign up </h1> 
                <p> 
                     <label for="name" class="name" data-icon="u">First Name:</label>
                     <input type="text"id="name" name="name" required="required" type="text" placeholder="First" />
                     <label for="last" class="lname" data-icon="u">Last Name:</label>
                     <input id="last" name="last" required="required" type="text" placeholder="Last" />
                     <label for="username" class="uname" data-icon="u">Username:</label>
                     <input id="username" name="username" required="required" type="text" placeholder="Username" />
                     <label for="password" class="password" data-icon="p">Password:</label>
                     <input id="password" name="password" required="required" type="password" placeholder="Password"/>
                    <!-- issue with password confirm maybe-->
                     <!-- label for="passwordConfirm" class="password" data-icon="p">Confirm Password:</label>
                     <input id="passwordConfirm" name="passwordsignup_confirm" required="required" type="password" placeholder="Password"/-->
                     <label for="email" class="email" data-icon="e" >Email:</label>
                     <input id="email" name="email" required="required" type="text" placeholder="example@domain.com"/> 
                    <label>Date of Birth:</label>
                     <select name="month" onChange="changeDate(this.options[selectedIndex].value);">
                     <option value="na">Month</option>
                     <option value="1">January</option>
                     <option value="2">February</option>
                     <option value="3">March</option>
                     <option value="4">April</option>
                     <option value="5">May</option>
                     <option value="6">June</option>
                     <option value="7">July</option>
                     <option value="8">August</option>
                     <option value="9">September</option> 
                     <option value="10">October</option>
                     <option value="11">November</option>
                     <option value="12">December</option>
                     </select>
                     <select name="day" id="day">
                     <option value="na">Day</option>
                     </select>
                     <select name="year" id="year">
                     <option value="na">Year</option>
                     </select>
                     <script language="JavaScript" type="text/javascript">
                     function changeDate(i){
                     var e = document.getElementById('day');
                     while(e.length>0)
                     e.remove(e.length-1);
                     var j=-1;
                     if(i=="na")
                     k=0;
                     else if(i==2)
                     k=28;
                     else if(i==4||i==6||i==9||i==11)
                     k=30;
                     else
                     k=31;
                     while(j++<k){
                     var s=document.createElement('option');
                     var e=document.getElementById('day');
                     if(j==0){
                     s.text="Day";
                     s.value="na";
                     try{
                     e.add(s,null);}
                     catch(ex){
                     e.add(s);}}
                     else{
                     s.text=j;
                     s.value=j;
                     try{
                     e.add(s,null);}
                     catch(ex){
                     e.add(s);}}}}
                     y = 1998;
                     while (y-->1908){
                     var s = document.createElement('option');
                     var e = document.getElementById('year');
                     s.text=y;
                     s.value=y;
                     try{
                     e.add(s,null);}
                     catch(ex){
                     e.add(s);}}
                     </script> 
                </p>
                <p> 
                     <label>Gender:</label>
                     <select name="gender">
                     <option value="1">Male</option>
                     <option value="2">Female</option>
                     </select>
                </p>   
                <p class="signin button">
                <input name="register" type="submit" value="Register" onclick="registerAttempt()"></>
                <!--input type="submit" name="register" value="Register"/--> 
                </p>

            </form>

            </div>
            <script>
                function registerAttempt() {
                  var xhttp = new XMLHttpRequest();
                  xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                      document.getElementById("loginColumn").innerHTML =
                      this.responseText;
                    }
                  };
                  xhttp.open("GET", "includes/register_success.php", true);
                  xhttp.send();
                }
            </script>
        </div>
