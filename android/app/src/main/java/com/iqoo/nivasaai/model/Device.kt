package com.iqoo.nivasaai.model

enum class DeviceState { ON, OFF, IDLE, WARNING, ACTIVE }
enum class RoomId { BEDROOM, LIVING, KITCHEN, BATHROOM, ENTRANCE }
enum class DeviceType { AC, FAN, LIGHT, TV, CHARGER, GEYSER, LOCK, FRIDGE, CAMERA }

data class Device(
    val id: String,
    val name: String,
    val roomId: RoomId,
    val roomName: String,
    val type: DeviceType,
    val state: DeviceState,
    val powerWatt: Int,
    val mode: String? = null,
    val targetTemp: Int? = null,
    val lastStateChange: String,
    val isAutomated: Boolean = true,
    val essential: Boolean = false
)

data class LivingEvent(
    val id: String,
    val timestamp: String,
    val roomName: String?,
    val description: String,
    val severity: String = "info"
)
