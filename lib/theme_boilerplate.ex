defmodule YourApplication do
  use XeeThemeScript

  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil

  def diff(old_data, new_data) do
    diff = JsonDiffEx.diff(old_data, new_data)
  end

  def init do
    {:ok, %{data: %{
     }}}
  end

  def join(data, id) do
    {:ok, %{data: data}}
  end

  def handle_received(data, _received) do
    {:ok, %{data: data}}
  end

  def handle_received(data, _action, _id) do
    {:ok, %{data: data}}
  end
end
