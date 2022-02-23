<?Php

/**
 *  A PHP file for fetching all images having file extensions defined below
 *  Source: https://stackoverflow.com/questions/13595113/html-javascript-iterate-through-all-elements-of-local-server-side-folder
 */ 

    /* Fetch AJAX POST from script.js containing information on file location */
    $location = $_POST['path'];

    /* 
     *  This array will hold all the image addresses 
     *  Can be accessed using indexes
     */
    $result = array();

    /* Get all the files in the specified directory */
    $files = scandir($location);

    foreach($files as $file) {
        switch(ltrim(strstr($file, '.'), '.')) {

            /* All files with the following file extensions are included */
            case "JPG": case "JPEG":case "png":case "PNG":case "GIF":case "gif":

                $result[] = $file;

        }
    } // End FOREACH

    /* Convert the array to JSON format */
    $resultJson = json_encode( $result );

    /* Output */
    echo( $resultJson );

?>