<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index() {
        $tags = Tag::all();
        return response()->json($tags);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'type' => 'required|string|max:255',
                'colour' => 'nullable|string|max:7',
            ]);
            $tag = Tag::create($validated);
            return response()->json([
                'success' => true,
                'message' => 'Tag berhasil ditambahkan',
                'data' => $tag
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambah tag: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function show(Tag $tag)
    {
        return response()->json($tag);
    }

    public function update(Request $request, Tag $tag)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'type' => 'required|string|max:255',
                'colour' => 'nullable|string|max:7',
            ]);
            $tag->update($validated);
            return response()->json([
                'success' => true,
                'message' => 'Tag berhasil diupdate',
                'data' => $tag
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal update tag: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(Tag $tag)
    {
        try {
            $tag->delete();
            return response()->json([
                'success' => true,
                'message' => 'Tag berhasil dihapus',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal hapus tag: ' . $e->getMessage(),
            ], 500);
        }
    }


}
