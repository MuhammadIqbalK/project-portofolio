<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Display the dashboard index page.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return inertia('Dashboard/Index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return inertia('Dashboard/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Validate and store logic here

        return redirect()->route('dashboard.index')
            ->with('success', 'Resource created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        // Fetch resource logic here

        return inertia('Dashboard/Show', [
            'id' => $id,
            // 'resource' => $resource,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        // Fetch resource logic here

        return inertia('Dashboard/Edit', [
            'id' => $id,
            // 'resource' => $resource,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        // Validate and update logic here

        return redirect()->route('dashboard.index')
            ->with('success', 'Resource updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        // Delete logic here

        return redirect()->route('dashboard.index')
            ->with('success', 'Resource deleted successfully.');
    }
}
