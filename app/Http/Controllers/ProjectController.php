<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\ProjectImage;
use App\Models\Tag;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with(['images', 'tags'])->get();
        return response()->json($projects);
    }

    public function create()
    {
        // Return view or data for creating a project (API: can be omitted)
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug',
            'status' => 'required|in:ongoing,completed',
            'short_description' => 'nullable|string',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
            'images' => 'array',
            'images.*' => 'file|image|max:2048',
            'image_types' => 'array',
            'image_types.*' => 'in:card,detail',
        ]);
        $project = Project::create($validated);
        // Sync tags
        if ($request->has('tags')) {
            $project->tags()->sync($request->tags);
        }
        // Handle images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $idx => $file) {
                $type = $request->image_types[$idx] ?? 'card';
                $path = $file->store('project_images', 'public');
                ProjectImage::create([
                    'project_id' => $project->id,
                    'type' => $type,
                    'url' => $path,
                ]);
            }
        }
        return response()->json($project->load(['images', 'tags']), 201);
    }

    public function show(Project $project)
    {
        return response()->json($project->load(['images', 'tags']));
    }

    public function edit(Project $project)
    {
        // Return view or data for editing a project (API: can be omitted)
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,' . $project->id,
            'status' => 'required|in:ongoing,completed',
            'short_description' => 'nullable|string',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
            'images' => 'array',
            'images.*' => 'file|image|max:2048',
            'image_types' => 'array',
            'image_types.*' => 'in:card,detail',
        ]);
        $project->update($validated);
        // Sync tags
        if ($request->has('tags')) {
            $project->tags()->sync($request->tags);
        }
        // Handle new images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $idx => $file) {
                $type = $request->image_types[$idx] ?? 'card';
                $path = $file->store('project_images', 'public');
                ProjectImage::create([
                    'project_id' => $project->id,
                    'type' => $type,
                    'url' => $path,
                ]);
            }
        }
        return response()->json($project->load(['images', 'tags']));
    }

    public function destroy(Project $project)
    {
        // Delete all images from storage
        foreach ($project->images as $img) {
            Storage::disk('public')->delete($img->url);
            $img->delete();
        }
        $project->tags()->detach();
        $project->delete();
        return response()->json(null, 204);
    }

    // Delete single image from project
    public function deleteImage(ProjectImage $image)
    {
        Storage::disk('public')->delete($image->url);
        $image->delete();
        return response()->json(['success' => true, 'message' => 'Image deleted']);
    }

    // Detach single tag from project
    public function detachTag(Project $project, Tag $tag)
    {
        $project->tags()->detach($tag->id);
        return response()->json(['success' => true, 'message' => 'Tag detached']);
    }
} 