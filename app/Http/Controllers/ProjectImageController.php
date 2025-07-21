<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectImage;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class ProjectImageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096',
            'type' => 'nullable|string|max:50',
        ]);

        $file = $request->file('image');
        $filename = uniqid('img_') . '.webp';
        $path = 'project-images/' . $filename;

        // Konversi ke WebP dan simpan ke storage
        $image = Image::make($file)->encode('webp', 80);
        Storage::disk('public')->put($path, $image);

        // Simpan ke database
        $projectImage = ProjectImage::create([
            'project_id' => $request->project_id,
            'type' => $request->type,
            'url' => $path,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Image uploaded and converted to WebP successfully.',
            'data' => $projectImage,
        ]);
    }
}
