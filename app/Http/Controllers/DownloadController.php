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
        $directLink = "https://drive.google.com/uc?export=download&id=1bm013rJL7J_HLrqfGKs2NwJ9b9zEaJEk";

        return redirect($directLink);
    }
}
