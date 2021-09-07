<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AjaxController extends Controller

{
    public function packFoldereBuilder(Request $request)
    {
        $tsampDir = $request->packName;
        //Making the directory Package
        mkdir($tsampDir, 0777, true);

        // Create for each item its own folder
        $key = $request->length;
        $src = "wonderpci";
        for ($i=1; $i < $key+1; $i++) { 
	    mkdir($tsampDir. '/i156033232889859'.($i), 0777, true);	
	    $dest = $tsampDir. "/i156033232889859".($i);
	    shell_exec("cp -r $src $dest");
        }
      
    }

    public function manifestBuilder(Request $request)
    {
        $data = $request->data;
        $packName =  $request->packName;
        $manifest = fopen($packName."/imsmanifest.xml", "w");
        fwrite($manifest,$data);
        fclose($manifest); 
    }

    public function contentBuilder(Request $request)
    {
        $data = $request->data;
        $QTI_id =  $request->name;
        $packName =  $request->packName;
        $qtiContent = fopen( $packName."/i156033232889859".$QTI_id."/qti.xml", "w");
        fwrite($qtiContent,$data);
        fclose($qtiContent);

    }


}
