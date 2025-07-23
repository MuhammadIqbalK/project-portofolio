<?php

namespace App\Http\Controllers;

use App\Models\ProjectDetail;
use App\Models\ProjectImage;
use Illuminate\Http\Request;

class ProjectDetailController extends Controller
{
    public function index($projectId)
    {
        $details = ProjectDetail::where('project_id', $projectId)->orderBy('position')->get();
        return response()->json($details);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'position' => 'required|integer',
            'type' => 'required|in:heading,paragraph,image,embed',
            'content' => 'nullable|string',
        ]);
        $detail = ProjectDetail::create($data);

        $images = [];
        if ($data['type'] === 'image') {
            $images = ProjectImage::where('project_id', $data['project_id'])
                ->where('type', 'detail')
                ->get();
        }

        return response()->json(['detail' => $detail, 'images' => $images]);
    }

    public function update(Request $request, ProjectDetail $projectDetail)
    {
        $data = $request->validate([
            'position' => 'required|integer',
            'type' => 'required|in:heading,paragraph,image,embed',
            'content' => 'nullable|string',
        ]);
        $projectDetail->update($data);

        $images = [];
        if ($data['type'] === 'image') {
            $images = ProjectImage::where('project_id', $projectDetail->project_id)
                ->where('type', 'detail')
                ->get();
        }

        return response()->json(['detail' => $projectDetail, 'images' => $images]);
    }

    public function destroy(ProjectDetail $projectDetail)
    {
        $projectDetail->delete();
        return response()->json(['success' => true]);
    }
} 