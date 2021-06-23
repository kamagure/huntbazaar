<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testMustCountDesignerVote(){
        Sanctum::actingAs(
            User::factory()->create(),
            ['view-tasks']
        );
    
        // $response = $this->get('/api/dashboard');
        $this->json('GET', 'api/dashboard', [], ['Accept' => 'application/json'])
            ->assertStatus(200)
            ->assertJsonStructure([
                'guests',
                'designers'
            ]);
    }

}
