<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DownloadController extends Controller
{
    public function download(Request $request)
    {
        // ID file Google Drive kamu
        $fileId = 'YOUR_FILE_ID';

        // Link direct download dari Google Drive
        $directLink = "https://drive.google.com/uc?export=download&id=19wqZTYQJJgWXI4i9u7ZODGpVJiCXSl9C";

        return redirect($directLink);
    }
}
