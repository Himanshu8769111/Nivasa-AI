package com.iqoo.nivasaai.viewmodel

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import com.iqoo.nivasaai.model.*
import com.iqoo.nivasaai.service.AIEngine

class LivingOSViewModel : ViewModel() {

    private val _devices = MutableStateFlow<List<Device>>(
        listOf(
            Device("dev_1", "Bedroom AC", RoomId.BEDROOM, "Bedroom", DeviceType.AC, DeviceState.ON, 1200, "Cool 22°C", 22, "10:45 PM"),
            Device("dev_2", "Bedroom Fan", RoomId.BEDROOM, "Bedroom", DeviceType.FAN, DeviceState.ON, 60, "Speed 3", null, "10:45 PM"),
            Device("dev_3", "Bedroom Light", RoomId.BEDROOM, "Bedroom", DeviceType.LIGHT, DeviceState.ON, 10, "Warm 80%", null, "10:30 PM"),
            Device("dev_4", "Living Fan", RoomId.LIVING, "Living Room", DeviceType.FAN, DeviceState.ON, 60, "Speed 4", null, "08:20 PM"),
            Device("dev_5", "Living Light", RoomId.LIVING, "Living Room", DeviceType.LIGHT, DeviceState.ON, 12, "Cool Daylight", null, "08:10 PM"),
            Device("dev_6", "Entrance Lock", RoomId.ENTRANCE, "Entrance", DeviceType.LOCK, DeviceState.ON, 5, "Guarded Lock", null, "09:00 PM")
        )
    )
    val devices: StateFlow<List<Device>> = _devices

    private val _currentPlan = MutableStateFlow<ActionPlan?>(null)
    val currentPlan: StateFlow<ActionPlan?> = _currentPlan

    fun interpretNLCommand(query: String) {
        val plan = AIEngine.interpretCommand(query, _devices.value)
        _currentPlan.value = plan
    }

    fun applyPlan(plan: ActionPlan) {
        // Execute updates
        _currentPlan.value = null
    }

    fun dismissPlan() {
        _currentPlan.value = null
    }
}
