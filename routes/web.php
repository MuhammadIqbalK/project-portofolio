<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Dashboard\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Tag;
use App\Http\Controllers\ContactController;

Route::middleware('guest')->group(function () {
  // Dashboard routes
  Route::get('/', function () {
    $tags = \App\Models\Tag::all();
    $projects = \App\Models\Project::with(['images', 'tags'])->get();
    return Inertia::render('Dashboard/Index', [
      'tags' => $tags,
      'projects' => $projects,
    ]);
  })->name('dashboard.index');
  Route::get('/dashboard/create', [DashboardController::class, 'create'])->name('dashboard.create');
  Route::post('/dashboard', [DashboardController::class, 'store'])->name('dashboard.store');
  Route::get('/dashboard/{id}', [DashboardController::class, 'show'])->name('dashboard.show');
  Route::get('/dashboard/{id}/edit', [DashboardController::class, 'edit'])->name('dashboard.edit');
  Route::put('/dashboard/{id}', [DashboardController::class, 'update'])->name('dashboard.update');
  Route::delete('/dashboard/{id}', [DashboardController::class, 'destroy'])->name('dashboard.destroy');

  // Admin Project & Tag CRUD
  Route::resource('admin/projects', App\Http\Controllers\ProjectController::class);
  Route::resource('admin/tags', App\Http\Controllers\TagController::class);
  // Route untuk hapus satu gambar project
  Route::delete('admin/project-images/{image:id}', [App\Http\Controllers\ProjectController::class, 'deleteImage']);
  // Route untuk detach satu tag dari project
  Route::delete('admin/projects/{project}/tags/{tag}', [App\Http\Controllers\ProjectController::class, 'detachTag']);
});

Route::post('/contact', [ContactController::class, 'send']);

Route::get('/secret', function () {
    $projects = \App\Models\Project::with(['images', 'tags'])->get();
    $tags = \App\Models\Tag::all();
    return Inertia::render('Admin/Index', [
        'projects' => $projects,
        'tags' => $tags,
    ]);
})->middleware(['guest'])->name('admin-panel');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
