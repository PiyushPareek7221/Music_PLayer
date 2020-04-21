<?php
    
    include("php/Config.php");
    session_start();
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $Fname = mysqli_real_escape_string($db,$_POST['Fname']);
        $Lname = mysqli_real_escape_string($db,$_POST['Lname']);
        $Uname = mysqli_real_escape_string($db,$_POST['Uname']);
        $Pass = mysqli_real_escape_string($db,$_POST['pass']);
        $Con_pass = mysqli_real_escape_string($db,$_POST['Con_pass']);

        if($Pass != $Con_pass) {
            $error = "password does not match.";
        }
        else{
            $sql = "SELECT Uname FROM login_details WHERE Uname = '$Uname'";
            $result = mysqli_query($db, $sql);
            $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

            $count = mysqli_num_rows($result);

            if($count >= 1) {
                $error = "username already taken";
            }
            else{
                $addRow = "insert into login_details values('$Fname','$Lname','$Uname','$Pass')";
                $result = mysqli_query($db, $addRow);
                header("location: login.php");
                die();
            }
        }

    }

?>

<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Create an Account</title>
        <link rel="stylesheet" href="Create_Account.css" type="text/css">
    </head>
    <body class="body2">
        <div class="Back_Page">
                <button class="Back_Page_Button">
                    <img src="svg/less-than.svg" class="Back_Button_Svg">
                    <a href="login.php" class="Back_Button_Text">BACK</a>
                </button>
        </div>
        <div class="main">
            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
                <div class="title">
                    Create Account
                </div>
                <div >
                    <div class="input_field1">
                        <input type="text" class="input" placeholder="First Name" id="firstname" name="Fname">
                    </div>
                    <div class="input_field2">
                        <input type="text" class="input" placeholder="Last name" id="lastname" name="Lname">
                    </div>
                    <div class="input_field3">
                    <input type="text" class="input" placeholder="Username" id="username" name="Uname">
                    </div>
                    <div class="input_field4">
                        <input type="password" class="input" placeholder="Password" id="Password" name="pass">
                    </div>
                    <div class="input_field5">
                        <input type="password" class="input" placeholder="Confirm" id="Confirm_Password" name="Con_pass">
                    </div>
                </div>
                <div class="btnmain">
                    <input type="submit" class="btn" id="Create_Account" value = "Create Account">
                </div>
                <?php echo $error ?>
            </form>
        </div>
    </body>
</html>
