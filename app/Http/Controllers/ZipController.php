<?php
   
namespace App\Http\Controllers;
   
use Illuminate\Http\Request;
use File;
use ZipArchive;
use App\Http\Controllers\downloadFileController;
  
class ZipController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     
    
     public function zipBuilder(Request $request)
    { 
    $tsampDir = $request->packName;
    $zip = new ZipArchive;
    $fileName = "myzip.zip";
    $filePath = $request->packName;

    if ($zip->open(public_path($fileName), ZipArchive::CREATE) === TRUE) {
        $this->addContent($zip, public_path($filePath));
        $zip->close();
        }

            
        


    


    /*     if ($zip->open(public_path($fileName), ZipArchive::CREATE) === TRUE) {
        $files = File::files(public_path("/".$tsampDir));
        foreach ($files as $name => $file)
            {
                // Skip directories (they would be added automatically)
                if (!$file->isDir())
                {
                    $relativeNameInZipFile = basename($file);
                    $zip->addFile($file, $relativeNameInZipFile);
                }
            }      
        $zip->close();   
    } */

    }

    /**
     * This takes symlinks into account.
     *
     * @param ZipArchive $zip
     * @param string     $path
     */
    private function addContent(\ZipArchive $zip, string $path)
    {
        /** @var SplFileInfo[] $files */
        $iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator(
                $path,
                \FilesystemIterator::FOLLOW_SYMLINKS
            ),
            \RecursiveIteratorIterator::SELF_FIRST
        );
    
        while ($iterator->valid()) {
            if (!$iterator->isDot()) {
                $filePath = $iterator->getPathName();
                $relativePath = substr($filePath, strlen($path) + 1);
    
                if (!$iterator->isDir()) {
                    $zip->addFile($filePath, $relativePath);
                } else {
                    if ($relativePath !== false) {
                        $zip->addEmptyDir($relativePath);
                    }
                }
            }
            $iterator->next();
        }
    }
       
}